#Refactor todoMVC - jQuery

## Part 1

* All 3th party components with bower
* Move all css to sass and add variable for the colors
* Add gulp file to
    - transpile css
    - serve with browsersync
    - watch for file changes
    - wiredep bower components
    - build to dist folder (concat, minify, uglify)
* Move util to separated file (and module)
* Refactor all logic of the todo data handling in a separate module

    todoRepo
        + add(item)
        + remove(index)
        + get(id) : item
        + getList(filter)      // filter: active/completed
        + store();
        + toggleAll(active);   // active: true/false

* Add unit tests for util and todoRepo

## Part 2
(copy your solution from part 1)

* Refactor to ES6 with classes
* Use commonJS as module pattern
* Use WebPack as build engine
    - Serve & Watch
    - Transpile sass
    - Transpile ES6

