from django.urls import path
from . import views

app_name = 'main'
urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("<str:subject>/<str:level>", views.course, name="course"),
    path("<str:subject>", views.subject, name="subject"),
    path("<str:subject>/<str:level>/revise", views.revise, name="revise"),
    path("<str:subject>/<str:level>/revise/<slug:slug>", views.topic, name="topic"),
    path("<str:subject>/<str:level>/practice", views.practice, name="practice"),
    path("<str:subject>/<str:level>/practice/<str:skill>", views.practiceSkill, name="practice_skill"),


    # API routes
    path("practice-questions/<int:id>", views.getPutPracticeQ, name="get-put-practice-q")
]