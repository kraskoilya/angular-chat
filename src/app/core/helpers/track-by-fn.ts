import { TrackByFunction } from '@angular/core';

export const trackByFn: TrackByFunction<any> = (index: number, item: any) =>
  item?.id || index;
