from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import (
    GurjarUserSerializer,
    data_required
)
from django.contrib.auth import authenticate
from .models import (
    GurjarUser,
    GurjarToken
)
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def get_users(request):
    users = GurjarUser.objects.all()
    serializer = GurjarUserSerializer(users, many=True)
    x = GurjarUser.objects.all().order_by('id')
    print(x)
    return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
    data_required(request.data)
    serializer = GurjarUserSerializer(data=request.data)
    # print(serializer.is_valid())
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def token_authentication(request):
    id = request.data.get('gurjar_id')
    password = request.data.get('password')
    print(id, password, 'a')
    user = authenticate(gurjar_id=id, password=password)
    print(user)
    if user is not None:
        
        token, created = GurjarToken.objects.get_or_create(user=user)
        serializer = GurjarUserSerializer(user)
        print(id, password)
        return Response({'token': token.key, 'user': serializer.data})
    else:
        return Response({'error': 'Invalid credentials'})
    
@api_view(['GET'])
def token_get_user(request):
    token = request.headers.get('token')
    print(token)
    user = GurjarToken.objects.filter(key=token)
    if user:
        serializer = GurjarUserSerializer(user[0].user)
        return Response({'valid': True, 'user': serializer.data})
    else:
        return Response({'valid': False})
    