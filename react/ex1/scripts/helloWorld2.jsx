// 2 verschillende mogelijkheden om props mee te geven

// 1. (most commonly used)
// var HelloWorld = React.createClass({
//     render: function() {
//         return (
//             <div>
//                 <h1>{this.props.name}</h1>
//             </div>
//         )
//     }
// });

// ReactDOM.render(<HelloWorld  name="Hello world" />, document.getElementById('app'));


// 2.
var HelloWorld = React.createClass({
    render: function() {
        return (
            <div>
                <h1>{this.props.children}</h1>
            </div>
        )
    }
});

ReactDOM.render(<HelloWorld>Hello World</HelloWorld>, document.getElementById('app'));
