import { TestBed } from '@angular/core/testing';

import { MapConfigSyncService } from './map-config-sync.service';

describe('MapConfigSyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapConfigSyncService = TestBed.get(MapConfigSyncService);
    expect(service).toBeTruthy();
  });
});
