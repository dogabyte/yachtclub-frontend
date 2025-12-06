import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMooringsComponent } from './admin-moorings.component';
import { MooringService } from '../../../../services/mooring.service';
import { ZoneService } from '../../../../services/zone.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AdminMooringsComponent', () => {
    let component: AdminMooringsComponent;
    let fixture: ComponentFixture<AdminMooringsComponent>;
    let mockMooringService: any;
    let mockZoneService: any;

    beforeEach(async () => {
        mockMooringService = {
            getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
            create: jasmine.createSpy('create').and.returnValue(of({})),
            update: jasmine.createSpy('update').and.returnValue(of({})),
            delete: jasmine.createSpy('delete').and.returnValue(of({}))
        };

        mockZoneService = {
            getAll: jasmine.createSpy('getAll').and.returnValue(of([]))
        };

        await TestBed.configureTestingModule({
            imports: [AdminMooringsComponent, HttpClientTestingModule, FormsModule],
            providers: [
                { provide: MooringService, useValue: mockMooringService },
                { provide: ZoneService, useValue: mockZoneService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AdminMooringsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load moorings and zones on init', () => {
        expect(mockMooringService.getAll).toHaveBeenCalled();
        expect(mockZoneService.getAll).toHaveBeenCalled();
    });
});
