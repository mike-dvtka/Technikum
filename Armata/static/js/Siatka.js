function Siatka() {
    var container = new THREE.Object3D()
    var lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-1000, 0, 0));
    geometry.vertices.push(new THREE.Vector3(1000, 0, 0));
    var line = new THREE.Line(geometry, lineMaterial);
    container.add(line)

    var x = 0;
    for (var i = 0; i <= 40; i++) {
        var lineClone = line.clone()
        lineClone.position.set(0, 0, x)
        container.add(lineClone)
        var lineClone2 = line.clone()
        lineClone2.position.set(0, 0, -x)
        container.add(lineClone2)
        x += 25;
    }

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, -1000));
    geometry.vertices.push(new THREE.Vector3(0, 0, 1000));
    var line = new THREE.Line(geometry, lineMaterial);
    container.add(line)

    var x = 0;
    for (var i = 0; i <= 40; i++) {
        var lineClone = line.clone()
        lineClone.position.set(x, 0, 0)
        container.add(lineClone)
        var lineClone2 = line.clone()
        lineClone2.position.set(-x, 0, 0)
        container.add(lineClone2)
        x += 25;
    }
    


    this.getLineCont = function () {
        return container
    }
}