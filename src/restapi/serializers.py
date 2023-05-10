from rest_framework import serializers
from .models import (
    GurjarUser
)
class GurjarUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GurjarUser
        # fields = '__all__'
        exclude = ('id','password')



def data_required(data):
        errors = {}

        if not data.get('nationality'):
            errors['nationality'] = 'Nationality is required'
        if not data.get('religion'):
            errors['religion'] = 'Religion is required'
        if not data.get('language'):
            errors['language'] = 'Language is required'
        if not data.get('name'):
            errors['name'] = 'Name is required'
        if not data.get('state'):
            errors['state'] = 'State is required'
        if not data.get('city'):
            errors['city'] = 'City is required'
        if not data.get('village'):
            errors['village'] = 'Village is required'
        if not data.get('gotra'):
            errors['gotra'] = 'Gotra is required'
        if not data.get('blood_group'):
            errors['blood_group'] = 'Blood Group is required'
        # if not data.get('date_of_birth'):
        #     errors['date_of_birth'] = 'Date of Birth is required'
        if not data.get('mobile_number'):
            errors['mobile_number'] = 'Mobile Number is required'
        if not data.get('email'):
            errors['email'] = 'Email is required'
        if not data.get('education'):
            errors['education'] = 'Education is required'
        if not data.get('profession'):
            errors['profession'] = 'Profession is required'


        if errors:
            raise serializers.ValidationError(errors)

        return data