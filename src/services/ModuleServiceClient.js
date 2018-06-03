const COURSE_MODULE_API_URL =
    'https://webdev-summer2018-jthuang.herokuapp.com/api/course/CID/module';
const MODULE_API_URL =
    'https://webdev-summer2018-jthuang.herokuapp.com/api/module';

let _singleton = Symbol();
export default class ModuleServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllModulesForCourse(courseId) {
        return fetch(
            COURSE_MODULE_API_URL
                .replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
    }

    createModule(courseId, module) {
        return fetch(COURSE_MODULE_API_URL.replace('CID', courseId),
            {
                body: JSON.stringify(module),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteModule(moduleId) {
        return fetch(MODULE_API_URL + '/' + moduleId, {
            method:'delete'
        });
    }

    findAllModules() {
        return fetch(MODULE_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleServiceClient(_singleton);
        return this[_singleton]
    }

}