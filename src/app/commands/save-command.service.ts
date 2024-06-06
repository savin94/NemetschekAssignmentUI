import { Injectable } from '@angular/core';
import { Command } from './interfaces/command';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SaveCommand implements Command {
    private saveButtonStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public saveButtonState$: Observable<boolean> = this.saveButtonStateSubject.asObservable();

    private loadingStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public loadingState$: Observable<boolean> = this.loadingStateSubject.asObservable();

    execute(data: any): void {
        this.setLoadingState(true);

        const saveToStorage = () => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    localStorage.setItem('Tab1', JSON.stringify(data.form1));
                    localStorage.setItem('Tab2', JSON.stringify(data.form2));
                    resolve();
                }, 2000);
            });
        };

        const storageType = new URLSearchParams(window.location.search).get('storagetype');
        if (storageType === 'cookie') {
            Promise.all([
                this.saveToCookie('Tab1', data.form1, 2000),
                this.saveToCookie('Tab2', data.form2, 3000)
            ]).then(() => {
                this.setLoadingState(false);
            });
        } else {
            saveToStorage().then(() => {
                this.setLoadingState(false);
            });
        }
    }

    canExecute(): boolean {
        return this.saveButtonStateSubject.value;
    }

    setSaveButtonState(newState: boolean): void {
        this.saveButtonStateSubject.next(newState);
    }

    setLoadingState(isLoading: boolean): void {
        this.loadingStateSubject.next(isLoading);
    }

    private saveToCookie(name: string, value: any, delay: number): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                const expires = new Date();
                expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
                document.cookie = `${name}=${JSON.stringify(value)};expires=${expires.toUTCString()};path=/`;
                resolve();
            }, delay);
        });
    }
}