from rest_framework import status
from rest_framework.response import Response
from .models import *
from .serializers import *
from .pusher import *
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework.decorators import api_view
from django.forms.models import model_to_dict
from django.contrib.auth.hashers import make_password, check_password
from mvola import Mvola
from mvola.tools import Transaction
from os import environ as env
from dotenv import load_dotenv
from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware import csrf
from rest_framework_simplejwt.exceptions import TokenError
from datetime import datetime


load_dotenv()
api = Mvola(
    env.get("CONSUMER_KEY"),
    env.get("SECRET_KEY"),
    status="SANDBOX",
)


@api_view(["GET"])
def getUsers(request):
    users = Users.objects.all()
    serializer = UserSerializer(users, many=True)
    response = Response(serializer.data)
    return response


@api_view(["POST"])
def register(request):
    try:
        data = request.data
        required_fields = [
            "role",
            "name",
            "email",
            "telephone",
            "password",
        ]

        role = data.get("role", "")
        name = data.get("name", "")
        username = data.get("username", "")
        email = data.get("email", "")
        cin = data.get("cin", "")
        telephone = data.get("telephone", "")
        ministere = data.get("ministere", "")
        hashed_password = ""

        for field in required_fields:
            value = data.get(field, "")
            if field != "password":
                value = value.strip()
            if not value:
                return Response(
                    {"error": f"{field} is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        email = email.strip()
        role = role.strip()
        name = name.strip().upper()

        if role == "user":
            username = " ".join(word.capitalize() for word in username.strip().split())
            cin = cin.strip()

            if not username or not cin:
                return Response(
                    {"error": "Userdata is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        elif role == "service":
            ministere = ministere.strip()
            if not ministere:
                return Response(
                    {"error": "Ministere is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # Valider l'email
        try:
            validate_email(email)
        except ValidationError:
            return Response(
                {"error": "Invalid email format"}, status=status.HTTP_400_BAD_REQUEST
            )

        if Users.objects.filter(email=email).exists():
            return Response({"userAlreadyExist": True})

        user_data = {}
        hashed_password = make_password(data.get("password"))
        user_data["password"] = hashed_password

        user_data["name"] = name
        user_data["username"] = username
        user_data["email"] = email
        user_data["cin"] = cin
        user_data["role"] = role
        user_data["ministere"] = ministere
        user_data["telephone"] = telephone

        user = Users.objects.create(**user_data)
        user.save()

        serializedUser = UserSerializer(user)
        return Response({"user": serializedUser.data}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def login(request):
    try:
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"dataRequired": True})

        email = email.strip()

        # Valider l'email
        try:
            validate_email(email)
        except ValidationError:
            return Response(
                {"error": "Invalid email format"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = Users.objects.filter(email=email).first()
        if not user:
            return Response({"userNotFound": True})

        if not check_password(password, user.password):
            return Response({"incorrectPassword": True})

        auth_token = RefreshToken()
        auth_token["id"] = user.id
        auth_token["role"] = user.role

        return Response(
            {"authToken": str(auth_token)},
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def verifyUser(request, email):
    try:
        if not email:
            return Response({"emailRequired": True})

        email = email.strip()

        # Valider l'email
        try:
            validate_email(email)
        except ValidationError:
            return Response(
                {"error": "Invalid email format"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = Users.objects.filter(email=email).first()
        if not user:
            return Response({"userNotFound": True})

        auth_token = RefreshToken()
        auth_token["id"] = user.id

        return Response(
            {"authToken": str(auth_token)},
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def getUser(request, id):
    try:
        if not id:
            return Response({"idRequired": True})

        user = Users.objects.filter(id=id).first()

        if not user:
            return Response({"userNotFound": True})

        user_data = model_to_dict(user, exclude=["password"])

        phone_numbers = UserPhoneNumber.objects.filter(userId=id).values(
            "value", "username"
        )
        user_data["telephones"] = list(phone_numbers)
        return Response(
            {"user": user_data},
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def editUser(request, id):
    try:
        data = request.data

        name = data.get("name")
        username = data.get("username")
        biographie = data.get("biographie")
        phones = data.get("phones")

        if not id:
            return Response({"idRequired": True})

        user = Users.objects.filter(id=id).first()
        if not user:
            return Response({"userNotFound": True})

        if phones:
            allItems = UserPhoneNumber.objects.filter(userId=id)
            newItemsSet = set(phones)

            if allItems.exists():
                allValues = {item.value: item for item in allItems}
                allValuesSet = set(allValues.keys())

                itemsToDelete = allValuesSet - newItemsSet
                itemsToAdd = newItemsSet - allValuesSet

                if itemsToDelete:
                    UserPhoneNumber.objects.filter(
                        userId=id, value__in=itemsToDelete
                    ).delete()

                for item in itemsToAdd:
                    UserPhoneNumber.objects.create(userId=user, value=item)

            else:
                for item in newItemsSet:
                    UserPhoneNumber.objects.create(userId=user, value=item)

        if name:
            user.name = name
        if username:
            user.username = username
        if biographie:
            user.biographie = biographie

        user.save()
        user_data = model_to_dict(user)

        user_data["phones"] = list(
            UserPhoneNumber.objects.filter(userId=id).values_list("value", flat=True)
        )

        return Response(
            {"user": user_data},
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def deleteUser(request, id):
    try:
        if not id:
            return Response({"idRequired": True})

        user = Users.objects.filter(id=id).first()
        if not user:
            return Response({"userNotFound": True})

        serializer = UserSerializer(user)
        user.delete()
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def mvola_payement(request, id):
    try:
        if not id:
            return Response({"idRequired": True})

        user = Users.objects.filter(id=id).first()
        if not user:
            return Response({"userNotFound": True})

        data = request.data

        debit_phone = data.get("debitPhone", "").strip()
        credit_phone = data.get("creditPhone", "").strip()
        amount = data.get("amount", "").strip()

        if not debit_phone:
            return Response({"debitPhoneRequired": True})
        elif not credit_phone:
            return Response({"creditPhoneRequired": True})

        res = api.generate_token()
        if res.success:
            api.token = res.response
        else:
            return Response({"tokenFailed": True}, status=status.HTTP_400_BAD_REQUEST)

        # credit_user = Users.objects.filter(id=credit_id).first()
        # if not credit_user:
        #     return Response({"creditUserNotFound": True})

        # debit_phones = list(
        #     UserPhoneNumber.objects.filter(userId=id).values_list("value", flat=True),
        # )
        # if not debit_phones:
        #     return Response({"noDebitPhones": True})
        # elif debit_phone not in debit_phones:
        #     return Response({"debitPhoneNotFound": True})

        # credit_phones = list(
        #     UserPhoneNumber.objects.filter(userId=id).values_list("value", flat=True),
        # )
        # if not credit_phones:
        #     return Response({"noCreditPhones": True})
        # elif credit_phone not in credit_phones:
        #     return Response({"creditPhoneNotFound": True})

        # INITIATE TRANSACTION
        transaction = Transaction(
            transid=f"{debit_phone}-{datetime.now().strftime('%Y%m%d%H%M%S')}",
            token=api.token,
            user_language="FR",
            user_account_identifier=debit_phone,
            partner_name="GSR",
            x_callback_url="",
            amount=f"{amount}",
            currency="Ar",
            original_transaction_reference="orgina",
            requesting_organisation_transaction_reference="ozcbajq",
            description_text="test_payement",
            request_date=datetime.now().strftime("%Y-%m-%dT%H:%M:%S.999Z"),
            debit=debit_phone,
            credit=credit_phone,
        )

        init = api.init_transaction(transaction)
        if init.success:
            reference = ReferencePayement.objects.create(
                userId=user,
                debitPhone=debit_phone,
                creditPhone=credit_phone,
                value=transaction.transid,
            )
            serializedReference = ReferencePayementSerializer(reference)
            return Response(
                {
                    "reference": serializedReference.data,
                },
            )
        else:
            raise Response(
                {
                    "error": f"{init.error}",
                },
            )

        return Response({"phones": credit_phone}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def verifyToken(request, token):
    try:
        if not token:
            return Response({"tokenRequired": True})

        decoded_token = RefreshToken(token)
        infos = {
            "id": decoded_token.payload["id"],
            "role": decoded_token.payload["role"],
            "iat": decoded_token.payload["iat"],
            "exp": decoded_token.payload["exp"],
        }

        user = Users.objects.filter(id=decoded_token.payload["id"]).first()

        if not user:
            return Response({"userNotFound": True})

        return Response({"infos": infos}, status=status.HTTP_200_OK)
    except TokenError:
        return Response({"invalidToken": True}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def createService(request, id):
    try:
        if not id:
            return Response({"idRequired": True})

        user = Users.objects.filter(id=id).first()

        if not user:
            return Response({"userNotFound": True})

        elif user.role == "user":
            return Response({"userNotAllowed": True})

        data = request.data
        required_fields = ["name", "description", "tarif", "infos"]

        name = data.get("name", "").strip()
        description = data.get("description", "").strip()
        tarif = data.get("tarif", "").strip()
        infos = data.get("infos", [])

        for field in required_fields:
            value = data.get(field, "")
            if field != "infos":
                value.strip()
            if not value:
                return Response(
                    {"error": f"{field} is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        try:
            tarif = float(tarif)
        except ValueError:
            return Response({"invalidTarif": True})

        service_data = {}
        service_data["userId"] = user
        service_data["name"] = name
        service_data["description"] = description
        service_data["tarif"] = tarif
        service_data["duree"] = ""

        service = Services.objects.create(**service_data)
        service.save()

        if infos:
            for obj in infos:
                value = obj.get("name", "").strip()
                type = obj.get("type", "").strip()

                if value and type:
                    ServiceInfos.objects.create(
                        serviceId=service,
                        value=value,
                        type=type,
                    )

        service_data = {}
        service_data = model_to_dict(service)
        service_data["infos"] = list(
            ServiceInfos.objects.filter(serviceId=service.id).values("value", "type")
        )

        return Response({"service": service_data}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def getAllServices(request, id):
    try:
        if not id:
            return Response({"idRequired": True})
        user = Users.objects.filter(id=id).first()

        if not user:
            return Response({"userNotFound": True})

        services = Services.objects.filter(userId=id, isBlocked=False).order_by(
            "-updatedAt"
        )
        result = []

        for service in services:
            service_data = model_to_dict(service)

            service_data["infos"] = list(
                ServiceInfos.objects.filter(serviceId=service.id).values(
                    "value", "type"
                )
            )

            result.append(service_data)

        return Response({"services": result}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def getService(request, id, pk):
    try:
        if not id:
            return Response({"idRequired": True})
        user = Users.objects.filter(id=id).first()

        if not user:
            return Response({"userNotFound": True})

        service = Services.objects.filter(userId=id, id=pk, isBlocked=False).first()
        serializedService = ServiceSerializer(service)

        return Response({"service": serializedService.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def sendDemande(request, id, pk):
    try:
        if not id:
            return Response({"idRequired": True}, status=status.HTTP_400_BAD_REQUEST)

        user = Users.objects.filter(id=id).first()
        if not user:
            return Response({"userNotFound": True}, status=status.HTTP_404_NOT_FOUND)

        service = Services.objects.filter(userId=id, id=pk).first()
        if not service:
            return Response({"serviceNotFound": True}, status=status.HTTP_404_NOT_FOUND)

        demande_data = {"userId": user, "serviceId": service}

        demande, created = DemandeServices.objects.update_or_create(
            userId=user, serviceId=service, defaults=demande_data
        )

        demande_data = model_to_dict(demande)
        status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK

        return Response({"demande": demande_data}, status=status_code)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @api_view(["GET"])
# def getAllDemande(request, id):
#     try:
#         if not id:
#             return Response({"idRequired": True}, status=status.HTTP_400_BAD_REQUEST)

#         user = Users.objects.filter(id=id).first()
#         if not user:
#             return Response({"userNotFound": True}, status=status.HTTP_404_NOT_FOUND)

#         demandes = DemandeServices.objects.filter(userId=id)
#         users = []
#         for demande in demandes:
#             local_user = Users.filter(id=demande.userId).first()
#             users.push(local_user)

#         demandes_data = [model_to_dict(demande) for demande in demandes]

#         return Response({"demandes": demandes_data}, status=status.HTTP_200_OK)
#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def getAllDemande(request, id):
    try:
        if not id:
            return Response({"idRequired": True}, status=status.HTTP_400_BAD_REQUEST)

        user = Users.objects.filter(id=id).first()
        if not user:
            return Response({"userNotFound": True}, status=status.HTTP_404_NOT_FOUND)

        demandes = DemandeServices.objects.filter(userId=id)
        demandes_data = []

        for demande in demandes:
            demande_dict = model_to_dict(demande)
            user_info = Users.objects.filter(
                id=demande.userId.id
            ).first()  # Assurez-vous d'accéder à l'attribut id de userId
            if user_info:
                demande_dict["user"] = model_to_dict(user_info)
            demandes_data.append(demande_dict)

        return Response({"demandes": demandes_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def acceptDemande(request, id, pk):
    try:
        if not id:
            return Response({"idRequired": True}, status=status.HTTP_400_BAD_REQUEST)

        user = Users.objects.filter(id=id).first()
        if not user:
            return Response({"userNotFound": True}, status=status.HTTP_404_NOT_FOUND)

        demande = DemandeServices.objects.filter(id=pk).first()
        if not demande:
            return Response({"serviceNotFound": True}, status=status.HTTP_404_NOT_FOUND)

        demande.statut = "accepted"
        demande.save()

        demande_data = model_to_dict(demande)

        return Response({"demande": demande_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def rejectDemande(request, id, pk):
    try:
        if not id:
            return Response({"idRequired": True}, status=status.HTTP_400_BAD_REQUEST)

        user = Users.objects.filter(id=id).first()
        if not user:
            return Response({"userNotFound": True}, status=status.HTTP_404_NOT_FOUND)

        demande = DemandeServices.objects.filter(id=pk).first()
        if not demande:
            return Response({"serviceNotFound": True}, status=status.HTTP_404_NOT_FOUND)

        demande.statut = "rejected"
        demande.save()

        demande_data = model_to_dict(demande)

        return Response({"demande": demande_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
