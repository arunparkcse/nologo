import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FilmsComponent } from './pages/films/films.component';
import { PhotographyComponent } from './pages/photography/photography.component';
import { CreativeComponent } from './pages/creative/creative.component';
import { CsrComponent } from './pages/csr/csr.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'No Logo — Integrated Communication Agency' },
  { path: 'about', component: AboutComponent, title: 'About — No Logo' },
  { path: 'films', component: FilmsComponent, title: 'Film — No Logo' },
  { path: 'photography', component: PhotographyComponent, title: 'Photography — No Logo' },
  { path: 'creative', component: CreativeComponent, title: 'Creative — No Logo' },
  { path: 'csr', component: CsrComponent, title: 'CSR / Social — No Logo' },
  { path: 'careers', component: CareersComponent, title: 'Careers — No Logo' },
  { path: 'contact', component: ContactComponent, title: 'Contact — No Logo' },
  { path: ':type/:slug', component: ProjectDetailComponent, title: 'Project — No Logo' },
  { path: '**', redirectTo: '' }
];
