from django.db import models
from projects.models import Project


class KPI(models.Model):

    STATUS_CHOICES = [
        ("ON_TRACK", "ON_TRACK"),
        ("AT_RISK", "AT_RISK"),
        ("OFF_TRACK", "OFF_TRACK"),
    ]

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="kpis"
    )

    name = models.CharField(max_length=255)

    target_value = models.FloatField()

    actual_value = models.FloatField(default=0)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="ON_TRACK"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name