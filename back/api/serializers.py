from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            "id",
            "name",
            "username",
            "email",
            "role",
            "cin",
            "ministere",
            "biographie",
            "createdAt",
            "updatedAt",
        )


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = "__all__"


class ReferencePayementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferencePayement
        fields = "__all__"
