import { Component, Input, OnInit } from '@angular/core';
import { ILink } from './link';

@Component({
  selector: 'link-component',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  readonly links: Array<ILink> = [
    {
      label: "Films",
      path: "films",
    },
    {
      label: "People",
      path: "people",
    },
    {
      label: "Planets",
      path: "planets",
    },
    {
      label: "Species",
      path: "species",
    },
    {
      label: "Starships",
      path: "starships",
    },
    {
      label: "Vehicles",
      path: "vehicles",
    },
  ];

  @Input()
  tab!: string;

  constructor() { }

  ngOnInit(): void { }

}
