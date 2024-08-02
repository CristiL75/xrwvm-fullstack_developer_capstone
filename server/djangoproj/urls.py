from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'djangoapp'

urlpatterns = [
    # Path for logout
    path('logout/', views.logout_request, name='logout'),
    
    # Path for registration
    path('register/', views.registration, name='register'),

    # Path for login
    path('login/', views.login_user, name='login'),

    # Path for get_dealerships
    path('get_dealers/', views.get_dealerships, name='get_dealers'),
    path(
        'get_dealers/<str:state>/', 
        views.get_dealerships, 
        name='get_dealers_by_state'
    ),

    # Path for dealer details
    path(
        'dealer/<int:dealer_id>/', 
        views.get_dealer_details, 
        name='dealer_details'
    ),

    # Path for adding a review
    path(
        'add_review/', 
        views.add_review, 
        name='add_review'
    ),

    # Path for reviews from dealer_id
    path(
        'reviews/dealer/<int:dealer_id>/', 
        views.get_dealer_reviews, 
        name='dealer_reviews'
    ),

    # Path for get_cars view
    path('get_cars/', views.get_cars, name='getcars'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
