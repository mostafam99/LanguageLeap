import json
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User, TopicNotes, Course, PracticeQuestion

# Create your views here
subjects = [c[0] for c in Course._meta.get_field('subject').choices]
levels = [c[0] for c in Course._meta.get_field('level').choices]
question_types = ["Multiple Choice", "True / False", "Similar Word / Phrase", "Connectors", "Short Answer", "Main Point", "Who said What", "Innotation Practice", "Pronounciation Practice", "Questions on Structure", "Grammer and Tenses"]

def index(request):
    return render(request, 'main/index.html')

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("main:index"))
        else:
            return render(request, "main/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "main/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("main:index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "main/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "main/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("main:index"))
    else:
        return render(request, "main/register.html")
    

def pageExists(entered_subject, entered_level):
    entered_subject = entered_subject.lower()
    entered_level = entered_level.lower()

    if entered_subject and entered_level:
        for subject in subjects:
            if entered_subject == subject.lower():
                entered_subject = subject
                subject_matches = True
                break
            else:
                subject_matches = False
        
        for level in levels:
            if entered_level == level.lower():
                entered_level = level
                level_matches = True
                break
            else:
                level_matches = False
        
        if subject_matches and level_matches:
            page_not_exists = False
            return entered_subject, entered_level, page_not_exists
        else:
            page_not_exists = True
            return entered_subject, entered_level, page_not_exists

    else:
        if entered_subject:
            for subject in subjects:
                    if entered_subject == subject.lower():
                        entered_subject = subject
                        return entered_subject, entered_level, False
        else:
            return entered_subject, entered_level, True



def course(request, subject, level):
    entered_subject, entered_level, page_not_exists = pageExists(subject, level)

    return render(request, 'main/course.html', {
        'subject': entered_subject,
        'level': entered_level,
        'page_not_exists': page_not_exists
    })


def subject(request, subject):
    entered_subject, entered_level, page_not_exists = pageExists(subject, "")

    return render(request, 'main/subject.html', {
        'subject': entered_subject,
        'page_not_exists': page_not_exists
    })


def revise(request, subject, level):
    entered_subject, entered_level, page_not_exists = pageExists(subject, level)
    course = Course.objects.get(subject = entered_subject, level=entered_level)

    return render(request, 'main/revise.html', {
        'subject': entered_subject,
        'level': entered_level,
        'page_not_exists': page_not_exists,
        'course': course
    })




def topic(request, subject, level, slug):
    entered_subject, entered_level, page_not_exists = pageExists(subject, level)
    topic = TopicNotes.objects.get(slug=slug)

    return render(request, 'main/topic.html', {
        'subject': entered_subject,
        'level': entered_level,
        'topic': topic,
        'page_not_exists': page_not_exists
    })

def practice(request, subject, level):
    entered_subject, entered_level, page_not_exists = pageExists(subject, level)
    return render(request, 'main/practice.html', {
        'subject': entered_subject,
        'level': entered_level,
        'page_not_exists': page_not_exists,
        'reading': 'reading',
        'writing': 'writing',
        'listening': 'listening',
        'speaking': 'speaking'
    })


def practiceSkill(request, subject, level, skill):
    entered_subject, entered_level, page_not_exists = pageExists(subject, level)
    course = Course.objects.get(subject = subject, level = level)
    if skill.lower() in ['listening', 'reading', 'writing', 'speaking']:
        return render(request, 'main/practiceSkill.html', {
            'subject': entered_subject,
            'level': entered_level,
            'page_not_exists': page_not_exists,
            'skill': skill,
            'practiceObj': PracticeQuestion.objects.filter(course = course, skill=skill.capitalize()).all()
        })
    return render(request, 'main/practiceSkill.html', {
            'subject': entered_subject,
            'level': entered_level,
            'skill': skill,
            'page_not_exists': True,
            'practiceObj': None
        })


@csrf_exempt
def getPutPracticeQ(request, question_id):
    # Query for requested question
    try:
        question = PracticeQuestion.objects.get(id=question_id)
    except PracticeQuestion.DoesNotExist:
        return JsonResponse({"error": "Question not found.", "status": "false"}, status=400)

    if request.method != "GET":
        return JsonResponse({"error": "POST request required.", "status": "false"}, status=400)
    
    # Return practice question contents
    if request.method == "GET":
        return JsonResponse({"question": question.serialize()}, status=201)
    

    elif request.method == "PUT":
        if request.user.is_anonymous:
            return JsonResponse({"error": "You must be logged in to submit a question.", "status": "false"}, status=400)
        
        data = json.loads(request.body)
        correct = data.get("correct", "")
        if correct == 'True':
            user = User.get(id=request.user.id)
            user.energypoints = user.energypoints + 100
            user.save()

        return HttpResponse(status=204)

    # post must be via GET or PUT
    else:
        return JsonResponse({
            "error": "GET or PUT request required."
        }, status=400)