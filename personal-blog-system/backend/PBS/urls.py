from django.urls import path
from django.contrib.auth import views as auth_views
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.views import View
from . import views

class RegisterView(View):
    def get(self, request):
        form = UserCreationForm()
        return render(request, 'register.html', {'form': form})

    def post(self, request):
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
        return render(request, 'register.html', {'form': form})

urlpatterns = [
    path('posts/', views.post_list, name='post_list'),
    path('posts/create/', views.create_post, name='create_post'),
    path('api/login', views.login_view, name='login'),
    path('api/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('api/register/', views.register, name='register'),
    path('posts/delete/<str:blogId>/', views.delete_post, name='delete_post'),
]