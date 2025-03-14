from django.urls import path
from .views import get_details,create_details,delete_contact,update_contact,contact_view


urlpatterns=[
    path("contact/", get_details, name="get_details"),
    path("contact/create", create_details ,name="create_details"),
    path("contact/delete/<int:id>/", delete_contact,name="delete_contact"),
    path("contact/update/<int:id>", update_contact,name="update_contact"),
    path("contact/view/<int:id>",contact_view, name="contact_view")
]