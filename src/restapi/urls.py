from django.urls import path
from .views import (
    get_users,
    create_user,
    token_authentication,
    token_get_user
)

urlpatterns = [
    path('users/', get_users),
    path('create_user/', create_user),
    path('login/', token_authentication),
    path('get_user/', token_get_user)
]
