from django.db import models
import string
import random
from rest_framework.authtoken.models import Token


class GurjarUser(models.Model):
    id = models.AutoField(primary_key=True)
    gurjar_id = models.CharField(max_length=20, blank=True, null=False)
    nationality = models.CharField(max_length=100, blank=True, null=True)
    religion = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=100, blank=True, null=True)
    language = models.CharField(max_length=100, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    village = models.CharField(max_length=100, blank=True, null=True)
    gotra = models.CharField(max_length=100, blank=True, null=True)
    blood_group = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    mobile_number = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    password = models.CharField(max_length=100, blank=True, null=True)
    education = models.CharField(max_length=100, blank=True, null=True)
    profession = models.CharField(max_length=100, blank=True, null=True)
    last_login = models.DateTimeField(auto_now=True, blank=True, null=True)
    def __str__(self):
        return f'{self.id}: {self.name}'

    class Meta:
        ordering = ('id',)

    def save(self, *args, **kwargs):
        if not self.gurjar_id:
            last_id = GurjarUser.objects.order_by('id').last()
            if last_id:
                last_number = int(last_id.gurjar_id[1:])
            else:
                last_number = 0
            new_number = last_number + 1
            self.gurjar_id = f'G{new_number:010d}'

            password_length = 12
            password_characters = string.ascii_letters + string.digits + string.punctuation
            random_password = ''.join(random.choice(password_characters) for _ in range(password_length))
            self.password = random_password
        super().save(*args, **kwargs)


class GurjarToken(Token):
    user = models.OneToOneField(GurjarUser, on_delete=models.CASCADE, related_name='auth_token')
