import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent {
  @Input() page: number;
  @Input() count: number;
  @Input() pagesToShow: number;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  onPage = (n: number): void => {
    this.goPage.emit(n);
  }

  onPrev = (): void => {
    this.goPrev.emit(true);
  }

  onNext = (next: boolean): void => {
    this.goNext.emit(next);
  }

  lastPage = (): boolean => {
    return this.count === this.page;
  }

  getPages = (): number[] => {
    const c = this.count;
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
}
