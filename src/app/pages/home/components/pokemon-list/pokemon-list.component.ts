import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons?: number;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonService
      .getPokemons(this.page * 10, 10)
      .subscribe((res: any) => {
        this.totalPokemons = res.count;

        res.results.forEach((result: any) => {
          this.pokemonService.getMoreData(result.name).subscribe((res: any) => {
            this.pokemons.push(res);
            console.log(this.pokemons);
          });
        });
      });
  }

  getDetail(name: string) {
    this.router.navigate(['/detail', name]);
  }
}
