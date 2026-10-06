import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CategoryPageComponent } from './pages/category/category-page.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { PerspectiveDetailComponent } from './pages/perspective-detail/perspective-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'No Logo — Integrated Communication Agency' },
  { path: 'about', component: AboutComponent, title: 'About — No Logo' },
  { path: 'careers', component: CareersComponent, title: 'Careers — No Logo' },
  { path: 'contact', component: ContactComponent, title: 'Contact — No Logo' },
  // Portfolio categories (films, photography, … and any added in the CMS). Title is set by the component.
  { path: ':category', component: CategoryPageComponent },
  { path: 'perspectives/:slug', component: PerspectiveDetailComponent, title: 'Perspectives — No Logo' },
  { path: ':type/:slug', component: ProjectDetailComponent, title: 'Project — No Logo' },
  { path: '**', redirectTo: '' }
];
