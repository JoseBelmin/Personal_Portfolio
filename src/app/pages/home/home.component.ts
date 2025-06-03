import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  // Slideshow One (OnlyBands)
  @ViewChildren('slideshowImageOne') slideshowImagesOne!: QueryList<ElementRef<HTMLImageElement>>;
  private imagesArrayOne: HTMLImageElement[] = [];
  private currentImageIndexOne: number = 0;
  private slideshowIntervalOne: any;

  // Slideshow Two (Banke Int)
  @ViewChildren('slideshowImageTwo') slideshowImagesTwo!: QueryList<ElementRef<HTMLImageElement>>;
  private imagesArrayTwo: HTMLImageElement[] = [];
  private currentImageIndexTwo: number = 0;
  private slideshowIntervalTwo: any;

  constructor() { }

  ngOnInit(): void {
    console.log('HomeComponent ngOnInit called.');
  }

  ngAfterViewInit(): void {
    console.log('HomeComponent ngAfterViewInit called.');

    // Initialize Slideshow One
    this.imagesArrayOne = this.slideshowImagesOne.map(el => el.nativeElement);
    console.log('Discovered slideshow images (One):', this.imagesArrayOne);
    if (this.imagesArrayOne.length > 0) {
      this.imagesArrayOne[0].classList.add('active');
      this.currentImageIndexOne = 0;
      console.log('First image of Slideshow One activated by JS:', this.imagesArrayOne[this.currentImageIndexOne]);
      this.startSlideshow(1); // Start slideshow one
    } else {
      console.warn('No slideshow images found for Slideshow One! Check #slideshowImageOne in HTML.');
    }

    // Initialize Slideshow Two
    this.imagesArrayTwo = this.slideshowImagesTwo.map(el => el.nativeElement);
    console.log('Discovered slideshow images (Two):', this.imagesArrayTwo);
    if (this.imagesArrayTwo.length > 0) {
      this.imagesArrayTwo[0].classList.add('active');
      this.currentImageIndexTwo = 0;
      console.log('First image of Slideshow Two activated by JS:', this.imagesArrayTwo[this.currentImageIndexTwo]);
      this.startSlideshow(2); // Start slideshow two
    } else {
      console.warn('No slideshow images found for Slideshow Two! Check #slideshowImageTwo in HTML.');
    }
  }

  /**
   * Starts a specific slideshow interval.
   * @param slideshowNumber 1 for the first slideshow, 2 for the second.
   */
  startSlideshow(slideshowNumber: number): void {
    console.log(`Slideshow ${slideshowNumber} interval starting...`);
    const intervalTime = 7000; // Increased from 4000ms to 7000ms (7 seconds)

    if (slideshowNumber === 1) {
      this.slideshowIntervalOne = setInterval(() => {
        this.nextSlide(1);
      }, intervalTime);
    } else if (slideshowNumber === 2) {
      this.slideshowIntervalTwo = setInterval(() => {
        this.nextSlide(2);
      }, intervalTime);
    }
  }

  /**
   * Transitions to the next slide for a specific slideshow.
   * @param slideshowNumber 1 for the first slideshow, 2 for the second.
   */
  nextSlide(slideshowNumber: number): void {
    let imagesArray: HTMLImageElement[];
    let currentImageIndex: number;

    if (slideshowNumber === 1) {
      imagesArray = this.imagesArrayOne;
      currentImageIndex = this.currentImageIndexOne;
    } else if (slideshowNumber === 2) {
      imagesArray = this.imagesArrayTwo;
      currentImageIndex = this.currentImageIndexTwo;
    } else {
      console.error('Invalid slideshow number:', slideshowNumber);
      return;
    }

    if (imagesArray.length === 0) {
      console.warn(`No images in slideshow ${slideshowNumber} to transition.`);
      return;
    }

    // Hide the current active image
    imagesArray[currentImageIndex].classList.remove('active');

    // Calculate the index of the next image
    const nextIndex = (currentImageIndex + 1) % imagesArray.length;

    // Show the next image
    imagesArray[nextIndex].classList.add('active');

    // Update the current index for the respective slideshow
    if (slideshowNumber === 1) {
      this.currentImageIndexOne = nextIndex;
    } else if (slideshowNumber === 2) {
      this.currentImageIndexTwo = nextIndex;
    }
    // console.log(`Slideshow ${slideshowNumber} new active index:`, nextIndex);
  }

  ngOnDestroy(): void {
    console.log('HomeComponent ngOnDestroy called. Clearing intervals.');
    if (this.slideshowIntervalOne) {
      clearInterval(this.slideshowIntervalOne);
    }
    if (this.slideshowIntervalTwo) {
      clearInterval(this.slideshowIntervalTwo);
    }
  }
}