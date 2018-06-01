let _singleton = Symbol();

const LESSON_API_URL =
    'http://localhost:8080/api/lesson';
const MODULE_LESSON_API_URL =
    'http://localhost:8080/api/course/CID/module/MID/lesson';


class LessonServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    }

    findAllLessons() {
        return fetch(LESSON_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    findAllLessonssForModule(courseId,moduleId) {
        return fetch(
            MODULE_LESSON_API_URL
                .replace('CID', courseId)
                .replace('MID',moduleId))
            .then(function (response) {
                return response.json();
            })
    }

    createLesson(courseId,moduleId,lesson) {
        return fetch(MODULE_LESSON_API_URL
            .replace('CID', courseId)
            .replace('MID',moduleId), {
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteLesson(lessonId) {
        return fetch(LESSON_API_URL + '/' + lessonId, {
            method:'delete'
        });
    }
}
export default LessonServiceClient;
