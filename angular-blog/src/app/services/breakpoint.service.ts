import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

const smallScreen = '(max-width: 767px)' as const;

@Injectable()
export class BreakpointService {
  readonly #breakpointObserver = inject(BreakpointObserver);

  readonly #isSmallScreen$ = this.#breakpointObserver.observe(smallScreen);

  readonly isSmallScreen = toSignal(
    this.#isSmallScreen$.pipe(map(({ matches }) => matches)),
  );
}
