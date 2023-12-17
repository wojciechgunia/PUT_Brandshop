import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Image } from 'src/app/modules/core/models/image.model';
import { ImageService } from 'src/app/modules/core/services/image.service';

@Component({
  selector: 'app-dialog-image',
  templateUrl: './dialog-image.component.html',
  styleUrls: ['./dialog-image.component.scss'],
})
export class DialogImageComponent implements OnInit {
  images: Image[] = [];
  selectedImage: Image | null = null;
  constructor(
    public dialogRef: MatDialogRef<DialogImageComponent>,
    private imageService: ImageService
  ) {}
  ngOnInit(): void {
    this.imageService.getImages().subscribe((response) => {
      this.images = response;
    });
  }

  selectImage(image: Image): void {
    this.selectedImage = image;
  }
}
