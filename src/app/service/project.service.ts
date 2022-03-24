import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Project} from "../projects/project";
import {catchError} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http : HttpClient,
              private authService: AuthService) { }

  getProjectById(projectId: number) {
    return this.http.get<Project>(`http://localhost:8080/api/projects/${projectId}`);
  }

  updateProject(toUpdateProject: Project, toUpdateProjectId: number) {
    return this.http.put<Project>(`http://localhost:8080/api/projects/${toUpdateProjectId}`, toUpdateProject);
  }

}
