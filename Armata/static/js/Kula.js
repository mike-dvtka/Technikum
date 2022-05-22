function Kula() {
    var container = new THREE.Object3D()
    var geometry = new THREE.SphereGeometry(8, 10, 10);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0,34,0)
    container.add(sphere);

    var geometry = new THREE.SphereGeometry(8, 10, 10);
    var material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
    var clone = new THREE.Mesh(geometry, material);
    clone.position.set(0,34,0)
    container.add(clone);

    this.getBall = function () {
        return container
    }
}