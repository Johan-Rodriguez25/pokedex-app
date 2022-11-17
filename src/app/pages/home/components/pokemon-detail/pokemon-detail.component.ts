import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon!: any;

  myParam!: string;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => (this.myParam = params['name'])
    );
    this.getPokemonDetail(this.myParam);
  }

  getPokemonDetail(name: string) {
    this.pokemonService.getMoreData(name).subscribe((res: any) => {
      this.pokemon = res;
      console.log(res);
    });
  }
}
