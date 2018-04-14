self.moveTo(0, 0);
self.resizeTo(screen.width, screen.height);

// Contains function for array
Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
}


// Figure out which map to load
function gup(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
    return "";
    else
    return results[1];
}
filename = gup("map")

// Main visualization code
d3.json(filename, function(maps) {

	// Initialize some variables
	var cur_map = [1]
	var s = 20
	var trans_len = 500
    var zoom_level = 1
	var nodes = [], words = [], node1 = [], node2 = [], vis = []
	var nav_height = 40, vis_height = screen.height - nav_height - 150, vis_width = screen.width - 25
    var fun_xx = [], fun_yy = [], zoom_level = [], zoom_level2 = []
    	
	// Add SVG element for navigation
	var nav = d3.select("#chart")
	.append("svg:svg")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", vis_width - 100)
	.attr("height", nav_height)
        
    // Draw map title
    nav.selectAll("text[class=title]")
    .data(d3.range(1, 2))
    .enter().append("svg:text")
    .attr("class", "title")
    .attr("x", 5)
    .attr("y", 17)
    .attr("fill", "#333")
    .text("Maps:")
		
	// Draw map selector rectangles
	function map_value(d) { return d.map_no };
	var no_maps = d3.max(maps.values, map_value)
	nav.selectAll("rect[class=mapno]")
	.data(d3.range(1, no_maps + 1))
	.enter().append("svg:rect")
	.attr("x", function(d) { return 55 + (d - 1) * (s + 4) })
	.attr("y", 2)
	.attr("width", s)
	.attr("height", s)
	.attr("rx", 2)
	.attr("ry", 2)
	.attr("stroke-width", 1.5)
	.attr("fill", function(d) { return cur_map.contains(d) ? "#700" : "#999" })
	.attr("stroke", function(d) { return cur_map.contains(d) ? d3.rgb("#700").darker() : d3.rgb("#999").darker() })
    .attr("class", "mapno")
	.attr("visibility", "visible")
	.on("click", function(d) { 
		if(!cur_map.contains(d) || cur_map.length > 1) {
            remove_map(); cur_map.length = 0; cur_map = [d]; update_map(); search_box[0][0].value = ""; update_selectors();  
		}
	})
    .on("mouseover", function(d) { update_selectors(d) })
    .on("mouseout", function() { update_selectors() })
	
	// Draw map selector text
	nav.selectAll("text[class=mapno]")
	.data(d3.range(1, no_maps + 1))
	.enter().append("svg:text")
	.attr("x", function(d) { return 55 + (d - 1) * (s + 4) + (s / 2) })
	.attr("y", 15 + s)
    .attr("fill", "#000")
	.attr("text-anchor", "middle")
	.attr("opacity", function(d) { return cur_map.contains(d) ? 1 : .15 })
	.attr("class", "mapno")
	.text(function(d) { return d } )
	.on("click", function(d) { 
		if(!cur_map.contains(d) || cur_map.length > 1) {
			remove_map(); cur_map.length = 0; cur_map = [d]; update_map(); search_box[0][0].value = ""; update_selectors(); 
		}
	})
    .on("mouseover", function(d) { update_selectors(d) })
    .on("mouseout", function() { update_selectors() })        
        
    // Draw search box 
    var search_box = d3.select("#chart").selectAll("input")
    .data(d3.range(1, 2))
    .enter().append("input")
    .attr("type", "text")
    .attr("name", "search_box")
    .on("keyup", function() { 
        if(d3.event.keyCode == 13) show_all_maps();
        update_all_maps_button(); update_selectors(); redraw(); 
    })
        
    // Draw "Show all maps for word:" text
    nav.selectAll("text[class=button]")
    .data(d3.range(1, 2))
    .enter().append("svg:text")
    .attr("x", function(d) { return screen.width - 290 } )
    .attr("y", s - 3)
    .attr("fill", "#000")
    .attr("text-anchor", "left")
    .attr("opacity", .2)
    .attr("class", "button")
    .text("Show all maps for word:")
    .on("click", function(d) { 
        show_all_maps()
    })
		
	// Draw "Show all maps for word:" button
	var showmaps_button = nav.selectAll("rect[class=button]")
	.data(d3.range(1, 2))
	.enter().append("svg:rect")
	.attr("x", function(d) { return screen.width - 305 })
	.attr("y", 0)
	.attr("width", 170)
	.attr("height", s + 5)
	.attr("rx", 3)
	.attr("ry", 3)
	.attr("stroke-width", 1.5)
	.attr("fill", "#999")
	.attr("stroke", function(d) { d3.rgb("#999").darker() })
	.attr("opacity", .2)
    .attr("class", "button")
	.on("click", function(d) {
		show_all_maps()
	})
    .on("mouseover", function() { update_all_maps_button(true) })
    .on("mouseout",  function() { update_all_maps_button() })
        
	// Draw initial map
	update_map()
		
	// Function that draws one or more maps
	function update_map() {
		
		// Size of maps depends on number of maps
        var no_rows = cur_map.length <= 3 ? 1 : 2
        var no_cols = Math.ceil(cur_map.length / no_rows)
        vis_height = (screen.height - nav_height - 150) / no_rows
        vis_width  = (screen.width - 25) / no_cols
		
		// Create functions to draw circles
		var fun_x = d3.scale.linear().domain([0, 1]).range([50, vis_width  - 50])
		var fun_y = d3.scale.linear().domain([0, 1]).range([20, vis_height - 20])
		var fun_r = d3.scale.sqrt().domain([0, 1]).range([0, 10])    
		
		// Loop over all maps we need to display		
		for(map_ind = 0; map_ind < cur_map.length; map_ind++) {
        
            // Push functions for zooming/panning
            zoom_level.push(1)
            zoom_level2.push(1)
            fun_xx.push(d3.scale.linear().domain([0, 1]).range([0, 1]))
            fun_yy.push(d3.scale.linear().domain([0, 1]).range([0, 1]))
        
			// Add SVG element for current map
			vis.push(d3.select("#chart")
			.append("svg:svg")
			.attr("x", nav_height + Math.floor(map_ind / no_cols) * vis_height)
            .attr("y", 1 + (map_ind % no_cols) * vis_width)
			.attr("width", vis_width - 5)
			.attr("height", vis_height)
			.attr("opacity", 0)
            .attr("map_ind", map_ind)
            .call(d3.behavior.zoom().on("zoom", redraw)))
			
			// Select data for current map
			nodes.push([])
			maps.values.forEach(function(d) {
				if(d.map_no == cur_map[map_ind]) { 
					nodes[map_ind].push({x: fun_x(d.x), y: fun_y(d.y), prop: fun_r(d.prop)})
				}
			})
			words.push([])
			maps.values.forEach(function(d) {
				if(d.map_no == cur_map[map_ind]) { 
					words[map_ind].push({x: fun_x(d.x), y: fun_y(d.y), word: d.word})
				}
			})	
		
			// Draw bounding box around SVG element
			vis[map_ind].selectAll("rect")
			.data(d3.range(1, no_maps + 1))
			.enter().append("svg:rect")
			.attr("x", 1)
			.attr("y", 1)
			.attr("width", vis_width - 7)
			.attr("height", vis_height - 2)
			.attr("stroke-width", 1.5)
			.attr("stroke", "#ddd")
			.attr("fill", "#fff")
				
			// Draw all circles
			node1.push(vis[map_ind].selectAll("circle.node")
			.data(nodes[map_ind])
			.enter().append("svg:circle")
			.attr("cx", function(d) { return d.x })
			.attr("cy", function(d) { return d.y })
			.attr("stroke-width", 1)
			.attr("fill", "#00F")
			.attr("stroke", "#00F")
			.attr("fill-opacity", .2)
			.attr("stroke-opacity", .25)
			.attr("opacity", 1)
			.attr("class", "node1")
			.attr("r", function(d) { return d.prop }))
				
			// Draw all words
			node2.push(vis[map_ind].selectAll("text.node")
			.data(words[map_ind])
			.enter().append("svg:text")
			.attr("x",  function(d) { return d.x + (10 / zoom_level[map_ind]) })
			.attr("y",  function(d) { return d.y + (4  / zoom_level[map_ind]) })
			.attr("cx", function(d) { return d.x + (10 / zoom_level[map_ind]) })
			.attr("cy", function(d) { return d.y + (4  / zoom_level[map_ind]) })
			.attr("text-anchor", "left")
            .attr("fill", function(d) { return d.word.toUpperCase().localeCompare(search_box[0][0].value.toUpperCase()) == 0 ? "#D00" : "#333" })
			.attr("opacity", 1)
			.attr("class", "node2")
			.text(function(d) { return d.word })
            .on("click", function(d) { search_box[0][0].value = d.word; update_all_maps_button(); update_selectors(); redraw() }))
			
			// Appearance transition
			vis[map_ind].transition().attr("opacity", 1).delay(trans_len).duration(trans_len)
		}		
	}
        
    // Function that redraws all maps
    function redraw() {
        
        // Figure out which map was zoomed, and change its transformations
        if(d3.event && !d3.event.type) {
            var zoom_map = d3.event.target.getAttribute("map_ind")
            zoom_level[map_ind] = d3.event.scale * zoom_level2[map_ind]
            d3.event.transform(fun_xx[zoom_map], fun_yy[zoom_map])
        }
        
        // Redraw all maps
        for(map_ind = 0; map_ind < cur_map.length; map_ind++) {
            var cur_fun_xx = fun_xx[map_ind]
            var cur_fun_yy = fun_yy[map_ind]
            node1[map_ind]
            .attr("cx", function(d) { return cur_fun_xx(d.x) })
            .attr("x",  function(d) { return cur_fun_xx(d.x) })
            .attr("cy", function(d) { return cur_fun_yy(d.y) })		   
            .attr("y",  function(d) { return cur_fun_yy(d.y) })
            node2[map_ind]
            .attr("cx", function(d) { return cur_fun_xx(d.x) + (10 / zoom_level[map_ind]) })
            .attr("x",  function(d) { return cur_fun_xx(d.x) + (10 / zoom_level[map_ind]) })
            .attr("cy", function(d) { return cur_fun_yy(d.y) + (4  / zoom_level[map_ind]) })		   
            .attr("y",  function(d) { return cur_fun_yy(d.y) + (4  / zoom_level[map_ind]) })
            .attr("fill", function(d) { return d.word.toUpperCase().localeCompare(search_box[0][0].value.toUpperCase()) == 0 ? "#D00" : "#333" })
        }
    }
		
	// Function that removes all maps
	function remove_map() {
		for(map_ind = 0; map_ind < cur_map.length; map_ind++) {
			nodes[map_ind].length = 0
            words[map_ind].length = 0
			vis[map_ind].transition().attr("opacity", 0).duration(trans_len).delay(0)
			vis[map_ind].transition().delay(trans_len).remove()
		}
		node1.length = 0
		node2.length = 0
		vis.length = 0
		nodes.length = 0
        fun_xx.length = 0
        fun_yy.length = 0
        zoom_level.length = 0
        zoom_level2.length = 0
    }
		
	// Function that updates the map selectors to highlight the currently displayed maps
	function update_selectors(mouseover) {
        
        // Find all occurrences of the specified word
        var word = search_box[0][0].value
		var occurrence = []
		maps.values.forEach(function(d) {
            if(d.word.toUpperCase().localeCompare(word.toUpperCase()) == 0 && !occurrence.contains(d.map_no)) { 
                occurrence.push(d.map_no)
            }
        })
		
		// Update map selector text
        nav.selectAll("text[class=mapno]").transition()
        .attr("opacity", function(d) { 
              if(cur_map.contains(d)) return 1;
              if(occurrence.contains(d)) return 1;
              if(!mouseover) return .15;
              return mouseover == d ? 1 : .15;
        })
        .delay(0)
        .duration(trans_len / 2)
		
		// Update map selector rectangles
		nav.selectAll("rect[class=mapno]").transition()
		.attr("fill", function(d) { 
              if(mouseover) {
                  if(mouseover == d) return "#99F";
              }
              if(occurrence.contains(d)) {
                  return cur_map.contains(d) ? "#070" : "#005";
              }              
              return cur_map.contains(d) ? "#700" : "#999";
        })
		.attr("stroke", function(d) { 
              if(mouseover) {
                  if(mouseover == d) return d3.rgb("#99F").darker();
              }
              if(occurrence.contains(d)) {
                  return cur_map.contains(d) ? d3.rgb("#070").darker() : d3.rgb("#005").darker();
              }              
              return cur_map.contains(d) ? d3.rgb("#700").darker() : d3.rgb("#999").darker();
        })
		.delay(0)
		.duration(trans_len / 2)
	}
		
    // Function that updates the "Show all maps" button
    function update_all_maps_button(mouseover) {
        
        // Find all occurrences of the specified word
        var word = search_box[0][0].value
		var occurrence = []
		maps.values.forEach(function(d) {
            if(d.word.toUpperCase().localeCompare(word.toUpperCase()) == 0 && !occurrence.contains(d.map_no)) { 
                occurrence.push(d.map_no)
            }
        });
		
        // Update status of button
        if(occurrence.length > 0) {
            nav.selectAll("rect[class=button]").transition()
            .attr("fill", function() { return mouseover ? "#99F" : "#999" })
            .attr("opacity", .6)
            .delay(0)
            .duration(trans_len / 4)
            nav.selectAll("text[class=button]").transition()
            .attr("opacity", 1)
            .delay(0)
            .duration(trans_len / 4)
        }
        else {
            nav.selectAll("rect[class=button]").transition()
            .attr("fill", "#999")
            .attr("opacity", .2)
            .delay(0)
            .duration(trans_len / 4)
            nav.selectAll("text[class=button]").transition()
            .attr("opacity", .2)
            .delay(0)
            .duration(trans_len / 4)
        }
    }
		
	// Function that zooms to a particular word in all maps
	function zoom_to_word(word) {
		
		// Loop over all maps
		var map_ind, i
		for(map_ind = 0; map_ind < cur_map.length; map_ind++) {
			for(i = 0; i < words[map_ind].length; i++) {
                if(words[map_ind][i].word.toUpperCase().localeCompare(word.toUpperCase()) == 0) {

                    // Translate node and word to the center
                    zoom_level2[map_ind] = cur_map.length <= 3 ? 3 : 5
                    var trans_x = (vis_width  / 2) - zoom_level2[map_ind] * nodes[map_ind][i].x
                    var trans_y = (vis_height / 2) - zoom_level2[map_ind] * nodes[map_ind][i].y
                    fun_xx[map_ind] = d3.scale.linear().domain([0, 1]).range([0 + trans_x, zoom_level2[map_ind] + trans_x])
                    fun_yy[map_ind] = d3.scale.linear().domain([0, 1]).range([0 + trans_y, zoom_level2[map_ind] + trans_y])
				}
			}
		}
	}
		
	// Function that shows all maps with the currently selected word in it
	function show_all_maps() {
        
        // Clicking is only allowed if word is non-empty
        var word = search_box[0][0].value
        if(word.localeCompare("") != 0) {
        
            // Find all occurrences of the specified word        
            var occurrence = []
            maps.values.forEach(function(d) {
                    if(d.word.toUpperCase().localeCompare(word.toUpperCase()) == 0 && !occurrence.contains(d.map_no)) { 
                    occurrence.push(d.map_no)
                }
            })
            
            // Update the maps shown
            if(occurrence.length > 0) {
                remove_map()
                cur_map.length = 0
                cur_map = occurrence
                update_map()
                update_selectors()
            
                // Zoom all maps to the current word
                zoom_to_word(word)
            }
        }
        
        // Force redraw
        redraw()
	}
});
