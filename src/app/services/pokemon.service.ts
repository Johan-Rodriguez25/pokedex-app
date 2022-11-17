import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getPokemons(offset: number, limit: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/api/v1/pokemons?offset=${offset}&limit=${limit}`
    );
  }

  getMoreData(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/pokemons/${name}`);
  }
}
