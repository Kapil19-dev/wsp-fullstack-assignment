from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from projects.views import ProjectViewSet
from kpis.views import KPIViewSet, project_kpi_summary

router = DefaultRouter()

router.register(r'projects', ProjectViewSet)

router.register(r'kpis', KPIViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/", include(router.urls)),

    path(
        "api/projects/<int:project_id>/summary/",
        project_kpi_summary
    ),
]