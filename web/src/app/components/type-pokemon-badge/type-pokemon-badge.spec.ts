import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePokemonBadge } from './type-pokemon-badge';

describe('TypePokemonBadge', () => {
  let component: TypePokemonBadge;
  let fixture: ComponentFixture<TypePokemonBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypePokemonBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypePokemonBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
