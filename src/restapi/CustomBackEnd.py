from django.contrib.auth.backends import BaseBackend
from .models import GurjarUser

class GurjarBackEnd(BaseBackend):
    def authenticate(self, request, gurjar_id=None, password=None,**kwargs):
        try:
            user = GurjarUser.objects.get(gurjar_id=gurjar_id)
            if user.password == password:
                return user
        except GurjarUser.DoesNotExist:
            return None

    def get_user(self, gurjar_id):
        try:
            return GurjarUser.objects.get(gurjar_id=gurjar_id)
        except GurjarUser.DoesNotExist:
            return None
