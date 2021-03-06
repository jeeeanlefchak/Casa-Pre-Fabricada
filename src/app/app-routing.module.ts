import { HomePage } from './pages/home/home';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import { LoginPage } from './pages/login/login';
import { AuthLayoutComponent } from './pages/auth/auth-layout.component';
import { AdministrativoPage } from './pages/administrativo/administrativo';
import { ModeloPage } from './pages/modelo/modelo';
import { SlidePage } from './pages/slide/slide';
import { UsuarioPage } from './pages/cadastroUsuario/usuario';

export const baseRoutes: Routes = [
  {
      path: '',
      component: AuthLayoutComponent,
      children: [
          { path: '', component: HomePage },
          { path: 'home', component: HomePage },
          { path: 'login', component: LoginPage },
          { path: 'administrativo', component: AdministrativoPage },
          { path: 'modelo', component: ModeloPage },
          { path: 'slide', component: SlidePage },
          { path: 'usuario', component: UsuarioPage }
      ]
  },
  {
      path: '',
      component: AuthLayoutComponent,
      children: [
          {path: 'login',component: LoginPage}
        ]
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(baseRoutes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class BaseRoute {
  constructor(router: Router) {
      router.events.subscribe((event) => {
        router.navigate(['']);
        //   if (event instanceof NavigationStart) {
        //       const token = sessionStorage.getItem('idEmpresa');
        //       if (token == null && event.url !== '/login') {
        //           router.navigate(['login']);
        //       } else if (token != null && event.url === '/') {
        //           router.navigate(['/home']);
        //       }
        //   } else if (event instanceof NavigationError) {
        //       router.navigate(['/home']);
        //   }
      });
  }
}
