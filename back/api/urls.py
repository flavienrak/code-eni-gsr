from django.urls import path
from . import views

urlpatterns = [
    path("get-users/", views.getUsers, name="get-users"),
    path("auth/register", views.register, name="register"),
    path("auth/login", views.login, name="login"),
    path("user/<str:id>/create-service", views.createService, name="create-service"),
    path(
        "user/<str:id>/service/get-all",
        views.getAllServices,
        name="get-all-services",
    ),
    path(
        "user/<str:id>/service/<str:pk>/get-service",
        views.getService,
        name="get-service",
    ),
    path(
        "user/<str:id>/service/<str:pk>/demande-service",
        views.sendDemande,
        name="demande-service",
    ),
    path(
        "user/<str:id>/demande/get-all",
        views.getAllDemande,
        name="get-all-demande",
    ),
    path(
        "user/<str:id>/demande/<str:pk>/accept",
        views.acceptDemande,
        name="accept-demande",
    ),
    path(
        "user/<str:id>/demande/<str:pk>/reject",
        views.rejectDemande,
        name="reject-demande",
    ),
    path("token/<str:token>/verify-token", views.verifyToken, name="verify-token"),
    path("user/<str:id>/get-user", views.getUser, name="get-user"),
    path("user/<str:email>/verify-user", views.verifyUser, name="verify-user"),
    path("user/<str:id>/edit-user", views.editUser, name="edit-user"),
    path("user/<str:id>/mvola-payement", views.mvola_payement, name="mvola-payement"),
    # path("user/<str:id>/delete", views.deleteUser, name="delete-user"),
]
