from django.db import models

class Contact_manage(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    phone = models.IntegerField()  
    address = models.CharField(max_length=100)

    def __str__(self):
        return self.name
