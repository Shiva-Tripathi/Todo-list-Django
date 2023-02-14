from django.urls import path
from .views import TaskList, TaskDetail, TaskCreate, TaskUpdate, DeleteView, CustomLoginView, RegisterPage, TaskReorder, homeview, weather, Pomodoro, Navi
from django.contrib.auth.views import LogoutView

urlpatterns = [
   
  

    path('login/', CustomLoginView.as_view(), name='login'),
    path('',homeview.as_view(),name = 'homeview'), 
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('register/', RegisterPage.as_view(), name='register'),

    path('tasklist/', TaskList.as_view(), name='tasks'),
    path('task/<int:pk>/', TaskDetail.as_view(), name='task'),
    path('task-create/', TaskCreate.as_view(), name='task-create'),
    path('task-update/<int:pk>/', TaskUpdate.as_view(), name='task-update'),
    path('task-delete/<int:pk>/', DeleteView.as_view(), name='task-delete'),
    path('task-reorder/', TaskReorder.as_view(), name='task-reorder'),

    path('weather/', weather.as_view(), name='weather'),

    path('Pomodoro/', Pomodoro.as_view(), name='Pomodoro'),
    path('Navi/', Navi.as_view(), name='Navi'),

    ]

" path('',homeview.as_view(),name = 'home'), "

"homeview"