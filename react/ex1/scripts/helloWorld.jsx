var HelloWorld = React.createClass({
    getInitialState: function() {
        return {
            name: 'Euricom Bootcamp #3'
        }
    },
    render: function() {
        return (
            <div>
                {/* this is a comment */}
                <h1>{this.state.name}</h1>
                <input type="text" value={this.state.name} onChange={this._changeHandler} />
            </div>
            // gerenderde code, indien je niet met JSX werkt kan je het ook zo noteren
            // React.CreateElement('h1', null, 'HelloWorld');
        )
    },
    _changeHandler: function(e) {
        this.setState({
            name: e.target.value
        });
    }
});

ReactDOM.render(<HelloWorld />, document.getElementById('app'));
