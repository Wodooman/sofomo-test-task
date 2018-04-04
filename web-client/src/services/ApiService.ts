import SurfingTrick from '../models/SurfingTrick';
import ISurfingTrick from '../interfaces/ISurfingTrick';

export function getAllTricks(complexity?: string): Promise<Array<SurfingTrick>> {
    return new Promise((resolve, reject) => {
        fetch(`/api/surfingTricks${complexity ? '/' + complexity : ''}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error while accessing API.');
                } else {
                    return response.json();
                }
            })
            .then(data => {
                resolve(data.map((entry: ISurfingTrick) => {
                    return new SurfingTrick(
                        entry.name, entry.youTubeLinkExample1, entry.youTubeLinkExample2,
                        entry.complexity, entry.requiredSpeed);
                }));
            })
            .catch(reject);
    });
}

export function getTrickByName(name: string): Promise<SurfingTrick> {
    return new Promise((resolve, reject) => {
        fetch(`/api/surfingTricks/details/${name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error while accessing API.');
                } else {
                    return response.json();
                }
            })
            .then((entry: ISurfingTrick) => {
                resolve(new SurfingTrick(
                    entry.name, entry.youTubeLinkExample1, entry.youTubeLinkExample2,
                    entry.complexity, entry.requiredSpeed));
            })
            .catch(reject);
    });
}