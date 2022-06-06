import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {InputText} from "primeng/inputtext";

@Component({
    selector: 'app-trello',
    templateUrl: './trello.component.html',
    styleUrls: ['./trello.component.scss']
})
export class TrelloComponent implements OnInit {
    value: string
    formCard: FormGroup

    constructor() {
        console.log(this.formCard)
    }

    ngOnInit(): void {

        this.addTaskToList()
    }

    addTaskToList() {
        const btn = document.querySelector('.add-new-card') as HTMLElement
        const addBtn = document.querySelector('.add-item') as HTMLElement
        const cancelBtn = document.querySelector('.cancel') as HTMLElement
        const textArea = document.querySelector('.textarea') as HTMLTextAreaElement
        const form = document.querySelector('.form') as HTMLElement
        const lists = document.querySelector('.lists') as HTMLElement


        btn.addEventListener('click', () => {
            form.style.display = 'block'
            btn.style.display = 'none'
            addBtn.style.display = 'none'

            textArea.addEventListener('input', (e: any) => {
                addBtn.style.display = 'flex'
                this.value = textArea.value;
                if (!!this.value) {
                    addBtn.style.display = 'flex'
                } else {
                    addBtn.style.display = 'none'
                }
            })

            cancelBtn.addEventListener('click', (event) => {
                this.value = ''
                textArea.value = ''
                form.style.display = 'none'
                addBtn.style.display = 'none'
                btn.style.display = 'flex'
            })

            addBtn.addEventListener('click', () => {
                const newItem = document.createElement('div')
                newItem.textContent = this.value
                newItem.classList.add("list-item")
                newItem.draggable = true
                lists.appendChild(newItem)

            })


        })
    }


}
