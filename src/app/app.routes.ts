import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { PerspectiveDetailComponent } from './pages/perspective-detail/perspective-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'No Logo — Integrated Communication Agency' },
  { path: 'about', component: AboutComponent, title: 'About — No Logo' },
  { path: 'careers', component: CareersComponent, title: 'Careers — No Logo' },
  { path: 'contact', component: ContactComponent, title: 'Contact — No Logo' },
  // CMS-defined pages: portfolio categories (films, photography, …) and custom pages. Title is set by the component.
  { path: ':slug', component: DynamicPageComponent },
  { path: 'perspectives/:slug', component: PerspectiveDetailComponent, title: 'Perspectives — No Logo' },
  { path: ':type/:slug', component: ProjectDetailComponent, title: 'Project — No Logo' },
  { path: '**', redirectTo: '' }
];
