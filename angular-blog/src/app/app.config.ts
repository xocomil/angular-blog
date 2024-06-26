import { provideFileRouter } from '@analogjs/router';
import { provideDateTimeHelper } from '@angular-blog/dates';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import {
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { provideTrpcClient } from '../trpc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideDateTimeHelper(),
    provideFileRouter(withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withFetch()),
    provideTrpcClient(),
  ],
};
