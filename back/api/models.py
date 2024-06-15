from django.db import models

# Create your models here.


class Users(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25, null=False, blank=False, default="")
    email = models.CharField(max_length=100, null=False, blank=False, default="")
    username = models.CharField(max_length=25, null=False, blank=False, default="")
    role = models.CharField(max_length=12, null=False, blank=False, default="")
    cin = models.CharField(max_length=12, null=False, blank=False, default="")
    isBlocked = models.BooleanField(blank=False, default=False)
    isBlocked = models.BooleanField(blank=False, default=False)
    telephone = models.CharField(max_length=14, blank=False, default="")
    ministere = models.CharField(max_length=50, null=False, blank=False, default="")
    password = models.CharField(max_length=250, null=False, blank=False, default="")
    biographie = models.TextField(blank=False, default="")
    createdAt = models.DateTimeField(auto_now_add=True, null=True)
    updatedAt = models.DateTimeField(auto_now=True, null=True)


class UserImages(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey(Users, on_delete=models.CASCADE)
    value = models.CharField(
        max_length=250, unique=True, null=False, blank=False, default=""
    )
    createdAt = models.DateTimeField(auto_now_add=True, null=True)
    updatedAt = models.DateTimeField(auto_now=True, null=True)


class UserPhoneNumber(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey(Users, on_delete=models.CASCADE)
    value = models.CharField(
        max_length=15, unique=True, null=False, blank=False, default=""
    )
    username = models.CharField(max_length=25, null=False, blank=False, default="")
    createdAt = models.DateTimeField(auto_now_add=True, null=True)
    updatedAt = models.DateTimeField(auto_now=True, null=True)


class Services(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25, null=False, blank=False, default="")
    userId = models.ForeignKey(Users, on_delete=models.CASCADE)
    image = models.CharField(max_length=250, null=False, blank=False, default="")
    tarif = models.CharField(max_length=50, null=False, blank=False, default="")
    isBlocked = models.BooleanField(blank=False, default=False)
    duree = models.CharField(max_length=50, null=False, blank=False, default="")
    description = models.TextField(blank=False, default="")
    createdAt = models.DateTimeField(auto_now_add=True, null=True)
    updatedAt = models.DateTimeField(auto_now=True, null=True)


class ServiceInfos(models.Model):
    id = models.AutoField(primary_key=True)
    serviceId = models.ForeignKey(Services, on_delete=models.CASCADE)
    value = models.CharField(max_length=250, blank=False, default="")
    type = models.CharField(max_length=25, blank=False, default="")


class DemandeServices(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey(Users, blank=False, on_delete=models.CASCADE)
    serviceId = models.ForeignKey(Services, on_delete=models.CASCADE)
    statut = models.CharField(max_length=25, blank=False, default="attente")
    createdAt = models.DateTimeField(auto_now_add=True, null=True)
    updatedAt = models.DateTimeField(auto_now=True, null=True)


class ReferencePayement(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey(Users, blank=False, on_delete=models.CASCADE)
    debitPhone = models.CharField(max_length=14, blank=False, default="")
    creditPhone = models.CharField(max_length=14, blank=False, default="")
    value = models.CharField(max_length=25, blank=False, default="")
