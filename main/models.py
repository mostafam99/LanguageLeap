import uuid
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.urls import reverse

# Create your models here.

LEVEL = [
    ("B-SL", "B-SL"),
    ("B-HL", "B-HL"),
    ("Ab-Initio", "Ab-Initio")
]

ALL_THEMES = [
    ("Identité", "Identité"),
    ("Expériences", "Expériences"),
    ("Organisation Sociale", "Organisation Sociale"),
    ("Ingéniosité Humaine", "Ingéniosité Humaine"),
    ("Partager le Planète", "Partager le Planète"),
    ("Identidad", "Identidad"),
    ("Experiencias", "Experiencias"),
    ("Organización Social", "Organización Social"),
    ("Ingenuidad Humana", "Ingenuidad Humana"),
    ("Compartiendo el Planeta", "Compartiendo el planeta")
]

SUBJECTS = [
    ("IB-French", "IB-French"),
    ("IB-Spanish", "IB-Spanish")
]

SKILLS = [
    ("Listening", "Listening"),
    ("Reading", "Reading"),
    ("Speaking", "Speaking"),
    ("Writing", "Writing")
]

QUESTION_TYPES = [
    ("Multiple Choice", "Multiple Choice"),
    ("True / False", "True / False"),
    ("Similar Word / Phrase", "Similar Word / Phrase"),
    ("Connectors", "Connectors"),
    ("Short Answer", "Short Answer"),
    ("Main Point", "Main Point"),
    ("Who said What", "Who said What"),
    ("Innotation Practice", "Innotation Practice"),
    ("Pronounciation Practice", "Pronounciation Practice"),
    ("Questions on Structure", "Questions on Structure"),
    ("Grammer and Tenses", "Grammer and Tenses")
]

TYPES = [
    ("text", "text"),
    ("choice", "choice")
]


class User(AbstractUser):
    energypoints = models.PositiveIntegerField(default=0, null = True)


class Course(models.Model):
    subject = models.CharField(max_length=50, choices=SUBJECTS, blank=True)
    level = models.CharField(max_length=15, choices = LEVEL, blank=True)
    themes = models.TextField(null=True)

    # When entering themes of course in django admin, you must seperate them with ', ' in order for the below property to work
    @property
    def get_themes(self):
        return self.themes.split(", ")
    
    def __str__(self):
        return f"{self.subject} {self.level}"
    

class TopicNotes(models.Model):
    topicNumber = models.IntegerField(null=True)
    course = models.ManyToManyField(Course, related_name="course_topic_notes", null=True) #is a manytomanyfield since it is possible for some courses to have the same notes especially SL and Ab Initio level courses
    englishName = models.CharField(max_length=70, null=True)
    name = models.CharField(max_length=70, null=True)
    description = models.TextField(blank=True, null=True)
    themes = models.CharField(max_length=40, choices=ALL_THEMES, blank=True)

    summary = models.TextField(blank=True, null=True)
    reasons = models.TextField(blank=True, null=True)
    consequences = models.TextField(blank=True, null=True)
    contextInLanguageCountry = models.TextField(blank=True, null=True)
    idioms = models.TextField(blank=True, null=True)
    opinions = models.TextField(blank=True, null=True)

    slug = models.SlugField(null=True)

    def get_absolute_url(self):
        return reverse("topic", kwargs={"slug": self.slug})

    def __str__(self):
        return f"{self.name} | With theme: {self.themes} | From course: {self.course.all()}"
    

class PracticeQuestion(models.Model):
    skill = models.CharField(max_length=40, choices = SKILLS, null=True, blank = True)
    course = models.ForeignKey(Course, related_name="course_practice_questions", on_delete=models.CASCADE, null=True, blank = True)
    difficulty = models.IntegerField(blank = True, validators=[MaxValueValidator(3), MinValueValidator(1)], null=True)

    questionType = models.CharField(blank = True, max_length=70, choices=QUESTION_TYPES , null=True)
    type = models.CharField(blank = True, max_length=70, choices=TYPES , null=True)
    questionInstructions = models.TextField(blank = True, null=True)

    numQuestionChoices = models.IntegerField(blank = True, null=True)
    questionChoice1 = models.TextField(blank = True, null=True)
    questionChoice2 = models.TextField(blank = True, null=True)
    questionChoice3 = models.TextField(blank = True, null=True)
    questionChoice4 = models.TextField(blank = True, null=True)
    questionChoice5 = models.TextField(blank = True, null=True)
    questionChoice6 = models.TextField(blank = True, null=True)
    correctChoiceSingle = models.IntegerField(blank = True, null=True, validators=[MaxValueValidator(6), MinValueValidator(1)])

    correctTextChoice1 = models.CharField(blank = True, null=True, max_length=700)
    correctTextChoice2= models.CharField(blank = True, null=True, max_length=700)
    correctTextChoice3 = models.CharField(blank = True, null=True, max_length=700)
    correctTextChoice4 = models.CharField(blank = True, null=True, max_length=700)
    correctTextChoice5 = models.CharField(blank = True, null=True, max_length=700)
    correctTextChoice6 = models.CharField(blank = True, null=True, max_length=700)
    
    questionMarkscheme = models.TextField(blank = True, null=True)

    questionAudioTranscript = models.TextField(blank = True, null=True)


    @property
    def get_all_choices(self):
        result = []
        for i in [self.questionChoice1, self.questionChoice2, self.questionChoice3, self.questionChoice4, self.questionChoice5, self.questionChoice6]:
            if i != "":
                result.append(i)
        return result
    

    def serialize(self):
        return {
            "skill": self.skill,
            "difficulty": self.difficulty,
            "type": self.type,
            "correctChoiceSingle": self.correctChoiceSingle,
            "correctTextChoice1": self.correctTextChoice1,
            "correctTextChoice2": self.correctTextChoice2,
            "correctTextChoice3": self.correctTextChoice3,
            "correctTextChoice4": self.correctTextChoice4,
            "correctTextChoice5": self.correctTextChoice5,
            "correctTextChoice6": self.correctTextChoice6,
        }
