function Armata() {
    var container = new THREE.Object3D()
    // 1 K O Ł O
    var geometry = new THREE.CylinderBufferGeometry(30, 30, 10, 10);
    var material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
    });
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(-15, 30, 0)
    cylinder.rotateZ(- Math.PI / 2);
    container.add(cylinder);
    var geometry = new THREE.CylinderBufferGeometry(30, 30, 10, 10);
    var material = new THREE.MeshBasicMaterial({ color: 0x4169E1 });
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(-15, 30, 0)
    cylinder.rotateZ(- Math.PI / 2);
    container.add(cylinder);
    // 2 K O Ł O
    var geometry = new THREE.CylinderBufferGeometry(30, 30, 10, 10);
    var material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
    });
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(15, 30, 0)
    cylinder.rotateZ(- Math.PI / 2);
    container.add(cylinder);
    var geometry = new THREE.CylinderBufferGeometry(30, 30, 10, 10);
    var material = new THREE.MeshBasicMaterial({ color: 0x4169E1 });
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(15, 30, 0)
    cylinder.rotateZ(- Math.PI / 2);
    container.add(cylinder);
    // L U F A
    var geometry = new THREE.CylinderBufferGeometry(10, 10, 60, 8, 5);
    var material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
    });
    geometry.translate(0, 30, 0)
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.rotation.y = -Math.PI
    cylinder.rotateY(- Math.PI / 2);
    cylinder.position.set(0, 30, 0)
    container.add(cylinder);

    var geometry = new THREE.CylinderBufferGeometry(10, 10, 60, 8, 5);
    var material = new THREE.MeshBasicMaterial({ color: 0x4169E1 });
    geometry.translate(0, 30, 0)
    var cylinder2 = new THREE.Mesh(geometry, material);
    cylinder2.rotation.y = -Math.PI
    cylinder2.rotateY(- Math.PI / 2);
    cylinder2.position.set(0, 30, 0)
    container.add(cylinder2);
    var axes = new THREE.AxesHelper(500)
    container.add(axes)



    this.getCannon = function () {
        return container
    }
    this.rotateRura = function (dwg) {
        cylinder.rotation.z = (90 - dwg) / 60
        cylinder2.rotation.z = (90 - dwg) / 60
    }
}