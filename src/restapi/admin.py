from django.contrib import admin
from .models import (
    GurjarUser,
    GurjarToken
)

class GurjarUserAdmin(admin.ModelAdmin):
    exclude = ('id',)

class GurjurTokenAdmin(admin.ModelAdmin):
    exclude = ('key',)
admin.site.register(GurjarUser, GurjarUserAdmin)
admin.site.register(GurjarToken, GurjurTokenAdmin)