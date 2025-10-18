import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPokemon } from './card-pokemon';

describe('CardPokemon', () => {
  let component: CardPokemon;
  let fixture: ComponentFixture<CardPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
