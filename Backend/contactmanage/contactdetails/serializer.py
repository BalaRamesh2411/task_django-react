from rest_framework import serializers
from .models import Contact_manage

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact_manage
        fields = '__all__'