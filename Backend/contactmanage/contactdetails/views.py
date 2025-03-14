from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Contact_manage
from .serializer import ContactSerializer
from django.shortcuts import get_object_or_404



@api_view(['GET'])
def get_details(request): 
    details = Contact_manage.objects.all() 
    serialized_data = ContactSerializer(details, many=True).data
    return Response(serialized_data)  

@api_view(['POST'])
def create_details(request):
    data=request.data
    create_serializer=ContactSerializer(data=data)
    if create_serializer.is_valid():
        create_serializer.save()
        return Response(create_serializer.data, status = status.HTTP_201_CREATED)
    return Response(create_serializer.error, status = status.HTTP_404_BAD_REQUEST)

@api_view(['DELETE'])
def delete_contact(request, id):
    contact = get_object_or_404(Contact_manage, id=id)  
    contact.delete()
    return Response({"message": "Contact deleted successfully"}, status=status.HTTP_200_OK)  

@api_view(['PUT'])
def update_contact(request,id):
    contact = Contact_manage.objects.get(id=id)  
    update_serializer = ContactSerializer(contact, data=request.data) 
    if update_serializer.is_valid():
        update_serializer.save()
        return Response(update_serializer.data, status=status.HTTP_200_OK)
    
    return Response(update_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def contact_view(request,id): 
    details = Contact_manage.objects.get(pk=id) 
    serialized_data = ContactSerializer(details).data
    return Response(serialized_data) 
