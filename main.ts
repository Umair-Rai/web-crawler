import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
}).catch((err: unknown) => {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error('An unknown error occurred:', err);
  }
});
